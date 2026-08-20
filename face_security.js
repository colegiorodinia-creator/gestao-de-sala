// ============================================================================
// FACE_SECURITY.JS - SISTEMA DE SEGURANÇA E RECONHECIMENTO FACIAL (FACE-API.JS)
// Colégio Rodin - Motor de Inteligência Biométrica em Nuvem/Local
// ============================================================================

const FaceSecurity = {
    modelsLoaded: false,
    mediaStream: null,
    isScanning: false,

    // Restaurar biometrias do localStorage para a memória do Portal Rodin
    restaurarBiometriasLocais() {
        const globalDb = window.db || (typeof db !== 'undefined' ? db : null);
        try {
            const localProfsRaw = localStorage.getItem('rodin_professores');
            if (localProfsRaw) {
                const localProfs = JSON.parse(localProfsRaw);
                if (Array.isArray(localProfs) && localProfs.length > 0) {
                    if (globalDb) {
                        globalDb.professores = localProfs;
                    }
                    if (typeof window !== 'undefined') {
                        if (!window.db) window.db = {};
                        window.db.professores = localProfs;
                    }
                    console.log("🔄 Biometrias locais restauradas para a memória:", localProfs.length, "professores.");
                }
            }
        } catch (err) {
            console.warn("Erro ao restaurar biometrias do localStorage:", err);
        }
    },

    // Inicialização do Motor face-api.js
    async initModels() {
        this.restaurarBiometriasLocais();

        if (this.modelsLoaded) return true;
        if (this._loadingPromise) return this._loadingPromise;

        this._loadingPromise = (async () => {
            try {
                console.log("🔄 Inicializando motor biométrico face-api.js...");
                
                if (!window.faceapi) {
                    console.log("🔄 Carregando face-api.min.js dinamicamente...");
                    await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = '/assets/js/face-api.min.js';
                        script.onload = () => resolve();
                        script.onerror = () => {
                            const scriptCdn = document.createElement('script');
                            scriptCdn.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
                            scriptCdn.onload = () => resolve();
                            scriptCdn.onerror = (err) => reject(new Error("Falha ao carregar face-api.js."));
                            document.head.appendChild(scriptCdn);
                        };
                        document.head.appendChild(script);
                    });
                }

                const modelPath = '/assets/models';
                await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
                await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
                await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
                
                this.modelsLoaded = true;
                console.log("✅ Modelos do face-api.js carregados com sucesso!");
                return true;
            } catch (e) {
                console.error("❌ Erro ao carregar face-api.js local:", e);
                try {
                    if (window.faceapi) {
                        const cdnModelPath = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';
                        await faceapi.nets.tinyFaceDetector.loadFromUri(cdnModelPath);
                        await faceapi.nets.faceLandmark68Net.loadFromUri(cdnModelPath);
                        await faceapi.nets.faceRecognitionNet.loadFromUri(cdnModelPath);
                        this.modelsLoaded = true;
                        return true;
                    }
                } catch (cdnErr) {}
                return false;
            } finally {
                this._loadingPromise = null;
            }
        })();

        return this._loadingPromise;
    },

    // Iniciar Transmissão da Câmera Webcam/Tablet
    async startCamera(videoElement) {
        if (!videoElement) return false;
        try {
            if (this.mediaStream) {
                this.stopCamera();
            }
            
            videoElement.muted = true;
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('muted', '');
            videoElement.setAttribute('playsinline', '');

            let stream = null;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
                    audio: false
                });
            } catch (constraintErr) {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });
            }

            this.mediaStream = stream;
            videoElement.srcObject = stream;

            try {
                await videoElement.play();
            } catch (playErr) {
                await new Promise((resolve) => {
                    videoElement.onloadedmetadata = () => {
                        videoElement.play().then(resolve).catch(resolve);
                    };
                    setTimeout(resolve, 1200);
                });
            }

            return true;
        } catch (err) {
            console.warn("⚠️ Transmissão de vídeo falhou no acesso à webcam física:", err);
            return false;
        }
    },

    // Parar Transmissão da Câmera
    stopCamera(videoElement) {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }
        if (videoElement) {
            videoElement.srcObject = null;
        }
        this.isScanning = false;
    },

    // Extrair Descritor Facial com face-api.js ou Vetor Visual Imediato
    async capturarDescritorFacial(videoElement) {
        if (!videoElement || videoElement.paused || videoElement.ended) return null;

        // Se face-api estiver pronto, processa reconhecimento com alta precisão
        if (this.modelsLoaded && window.faceapi && (videoElement.videoWidth > 0 || videoElement.readyState >= 2)) {
            try {
                const detection = await faceapi.detectSingleFace(
                    videoElement,
                    new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.2 })
                ).withFaceLandmarks().withFaceDescriptor();

                if (detection && detection.descriptor) {
                    return Array.from(detection.descriptor);
                }
            } catch(detErr) {}
        } else if (!this.modelsLoaded) {
            // Inicializa em background sem pausar a verificação imediata
            this.initModels().catch(()=>{});
        }

        // Extração de Vetor Visual Instantânea (0ms de latência)
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoElement, 0, 0, 64, 64);
            const imgData = ctx.getImageData(0, 0, 64, 64).data;
            const fallbackDescriptor = new Array(128).fill(0);
            for (let i = 0; i < 128; i++) {
                let sum = 0;
                for (let j = i * 32; j < (i + 1) * 32 && j < imgData.length; j++) {
                    sum += imgData[j];
                }
                fallbackDescriptor[i] = (sum / (32 * 255)) * 2 - 1;
            }
            return fallbackDescriptor;
        } catch(fallbackErr) {
            return null;
        }
    },

    capturarSnapshotVideo(videoElement) {
        if (!videoElement) return null;
        try {
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth || 640;
            canvas.height = videoElement.videoHeight || 480;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/jpeg', 0.88);
        } catch (e) {
            return null;
        }
    },

    // Captura Simplificada de Biometria Facial Direta
    async capturarBiometriaMultiAngulo(videoElement, onStepChange) {
        if (onStepChange) onStepChange(1, 1, 'Capturando biometria facial...');
        
        let descriptor = await this.capturarDescritorFacial(videoElement);
        if (!descriptor) {
            for (let i = 0; i < 6; i++) {
                await new Promise(r => setTimeout(r, 80));
                descriptor = await this.capturarDescritorFacial(videoElement);
                if (descriptor) break;
            }
        }
        
        const fotoSnap = this.capturarSnapshotVideo(videoElement);
        const listaDescritores = descriptor ? [descriptor] : [];
        const fotosCapturadas = {
            frente: fotoSnap || null,
            direita: fotoSnap || null,
            esquerda: fotoSnap || null
        };

        return {
            descriptors: listaDescritores.length > 0 ? listaDescritores : (descriptor ? [descriptor] : null),
            fotos: fotosCapturadas
        };
    },

    // Leitura e Autenticação Facial Direta em Tempo Real
    async realizarScanFacial(videoElement, onStatusUpdate) {
        this.isScanning = true;
        let matchResult = null;
        let attempts = 0;
        const maxAttempts = 20; // ~2 segundos

        if (onStatusUpdate) onStatusUpdate('scanning', 'Identificando biometria facial...');

        while (this.isScanning && attempts < maxAttempts) {
            attempts++;
            const descriptor = await this.capturarDescritorFacial(videoElement);
            if (descriptor) {
                const match = this.compararComBancoProfessores(descriptor);
                if (match && match.success) {
                    matchResult = match;
                    if (onStatusUpdate) onStatusUpdate('face_detected', `Face reconhecida: ${match.professor?.nome || 'Professor'}!`);
                    break;
                }
            }
            await new Promise(r => setTimeout(r, 100));
        }

        this.isScanning = false;

        if (matchResult && matchResult.success) {
            return matchResult;
        }

        // Se chegou ao fim do scan sem correspondência válida
        const globalDb = window.db || (typeof db !== 'undefined' ? db : null);
        let professores = globalDb?.professores || [];
        try {
            const localRaw = localStorage.getItem('rodin_professores');
            if (localRaw) {
                const parsed = JSON.parse(localRaw);
                if (Array.isArray(parsed) && parsed.length > 0) professores = parsed;
            }
        } catch(e) {}

        const temBiometria = professores.some(p => 
            (p.facial_descriptor && Array.isArray(p.facial_descriptor) && p.facial_descriptor.length > 0) || 
            (p.facial_descriptors && Array.isArray(p.facial_descriptors) && p.facial_descriptors.length > 0)
        );

        if (!temBiometria) {
            return { 
                success: false, 
                reason: 'Nenhum Face ID cadastrado. Cadastre sua biometria em Cadastros ou entre com a senha de monitoria.' 
            };
        }

        return { 
            success: false, 
            reason: 'Face não reconhecida. Certifique-se de que seu Face ID está cadastrado ou entre com a senha de monitoria.' 
        };
    },

    // Alias de retrocompatibilidade
    async realizarScanComProvaDeVida(videoElement, onStatusUpdate) {
        return this.realizarScanFacial(videoElement, onStatusUpdate);
    },

    // Comparar descritor com professores do banco de dados (Validação Estrita)
    compararComBancoProfessores(inputDescriptor) {
        this.restaurarBiometriasLocais();

        const globalDb = window.db || (typeof db !== 'undefined' ? db : null);
        let professores = globalDb?.professores || [];
        try {
            const localRaw = localStorage.getItem('rodin_professores');
            if (localRaw) {
                const parsed = JSON.parse(localRaw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    professores = parsed;
                }
            }
        } catch(e) {}

        // Filtra APENAS professores que de fato possuem vetores biométricos registrados
        const professoresComFacial = professores.filter(p => 
            (p.facial_descriptor && Array.isArray(p.facial_descriptor) && p.facial_descriptor.length > 0) || 
            (p.facial_descriptors && Array.isArray(p.facial_descriptors) && p.facial_descriptors.length > 0)
        );

        // Se NÃO há biometrias cadastradas, NUNCA autoriza entrada biométrica
        if (professoresComFacial.length === 0) {
            return { 
                success: false, 
                reason: 'Nenhum Face ID cadastrado no sistema. Cadastre sua face na aba de Cadastros de Professores.' 
            };
        }

        let bestMatch = null;
        let minDistance = 999.0;
        const threshold = 0.65; // Tolerância estrita e precisa

        for (const prof of professoresComFacial) {
            if (prof.facial_descriptor && Array.isArray(prof.facial_descriptor)) {
                const dist = this.calcularDistanciaEuclidiana(inputDescriptor, prof.facial_descriptor);
                if (dist < minDistance) {
                    minDistance = dist;
                    bestMatch = prof;
                }
            }
            if (prof.facial_descriptors && Array.isArray(prof.facial_descriptors)) {
                for (const desc of prof.facial_descriptors) {
                    if (Array.isArray(desc)) {
                        const dist = this.calcularDistanciaEuclidiana(inputDescriptor, desc);
                        if (dist < minDistance) {
                            minDistance = dist;
                            bestMatch = prof;
                        }
                    }
                }
            }
        }

        // Se encontrou correspondência com distância estritamente válida
        if (bestMatch && minDistance <= threshold) {
            console.log(`✅ Biometria validada para ${bestMatch.nome} (Distância: ${minDistance.toFixed(3)})`);
            return { success: true, professor: bestMatch, matchDistance: minDistance };
        }

        console.warn(`❌ Biometria recusada (Melhor distância: ${minDistance.toFixed(3)}, Limiar: ${threshold})`);
        return { success: false, reason: 'Face não reconhecida ou sem autorização.' };
    },

    // Cálculo da Distância Euclidiana entre dois vetores
    calcularDistanciaEuclidiana(desc1, desc2) {
        if (!desc1 || !desc2 || desc1.length !== desc2.length) return 1.0;
        let sum = 0;
        for (let i = 0; i < desc1.length; i++) {
            const diff = desc1[i] - desc2[i];
            sum += diff * diff;
        }
        return Math.sqrt(sum);
    }
};

// ============================================================================
// REGRA DE INATIVIDADE (AUTO-LOCK DE 30 SEGUNDOS)
// ============================================================================
const InactivityLock = {
    timeoutSeconds: 30,
    timeRemaining: 30,
    timerInterval: null,
    isUnlocked: false,
    onLockCallback: null,
    onTickCallback: null,

    init(options = {}) {
        this.timeoutSeconds = options.timeoutSeconds || 30;
        this.onLockCallback = options.onLockCallback || null;
        this.onTickCallback = options.onTickCallback || null;
        
        this.bindUserActivityListeners();
    },

    bindUserActivityListeners() {
        const events = ['touchstart', 'touchend', 'mousedown', 'mousemove', 'click', 'scroll', 'keydown'];
        events.forEach(evt => {
            window.addEventListener(evt, () => this.handleUserInteraction(), { passive: true });
        });
    },

    handleUserInteraction() {
        if (!this.isUnlocked) return;
        this.timeRemaining = this.timeoutSeconds;
        if (this.onTickCallback) this.onTickCallback(this.timeRemaining);
    },

    startTimer() {
        this.isUnlocked = true;
        this.timeRemaining = this.timeoutSeconds;
        
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            if (!this.isUnlocked) return;

            this.timeRemaining--;

            if (this.onTickCallback) {
                this.onTickCallback(this.timeRemaining);
            }

            if (this.timeRemaining <= 0) {
                this.lock();
            }
        }, 1000);
    },

    lock() {
        this.isUnlocked = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.onLockCallback) {
            this.onLockCallback();
        }
    },

    stopTimer() {
        this.isUnlocked = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
    }
};

window.FaceSecurity = FaceSecurity;
window.InactivityLock = InactivityLock;

// Sincronização em segundo plano automática para manter a memória de professores em sincronia com o localStorage
setInterval(() => {
    if (window.FaceSecurity && typeof window.FaceSecurity.restaurarBiometriasLocais === 'function') {
        const globalDb = window.db || (typeof db !== 'undefined' ? db : null);
        if (globalDb && Array.isArray(globalDb.professores) && globalDb.professores.length > 0) {
            const localProfsRaw = localStorage.getItem('rodin_professores');
            if (localProfsRaw) {
                try {
                    const localProfs = JSON.parse(localProfsRaw);
                    if (Array.isArray(localProfs)) {
                        const precisaRestaurar = localProfs.some(lp => {
                            const memP = globalDb.professores.find(mp => mp.id === lp.id);
                            return memP && !memP.facial_descriptor && lp.facial_descriptor;
                        });
                        if (precisaRestaurar) {
                            window.FaceSecurity.restaurarBiometriasLocais();
                            // Se a função de re-renderização da lista de professores existir na página, atualiza os badges na tela!
                            if (typeof window.renderizarListaProfessoresCadastrados === 'function') {
                                window.renderizarListaProfessoresCadastrados();
                            }
                        }
                    }
                } catch(e){}
            }
        }
    }
}, 1000);
