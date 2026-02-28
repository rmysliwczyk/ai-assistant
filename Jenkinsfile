pipeline {
    agent any

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'OLLAMA_API_KEY', variable: 'OLLAMA_API_KEY'),
                    ]) {
                        sh """
                        rm .env || true
                        echo "OLLAMA_API_KEY=${OLLAMA_API_KEY}" >> backend/.env
                        """
                    }
                }
            }
        }

        stage('Run Services') {
            steps {
                sh 'docker compose up --build --force-recreate -d'
            }
        }
    }
}
