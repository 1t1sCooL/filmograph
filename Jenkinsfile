pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = '1t1scool'
        BACKEND_IMAGE = 'filmograph-service'
        FRONTEND_IMAGE = 'filmograph-fe'
        DOCKER_HUB_CREDS = 'dockerhub'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build & Push Backend') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}",
                                 usernameVariable: 'USER',
                                 passwordVariable: 'PASS')]) {
                    sh """
                        docker build -t ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} -t ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:latest .
                        echo \$PASS | docker login -u \$USER --password-stdin
                        docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:latest
                    """
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}",
                                 usernameVariable: 'USER',
                                 passwordVariable: 'PASS')]) {
                    sh """
                        docker build -f fe/Dockerfile --build-arg NEXT_PUBLIC_API_URL=/api/filmograph -t ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} -t ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:latest fe/
                        echo \$PASS | docker login -u \$USER --password-stdin
                        docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    sed -i "s|image: .*filmograph-service.*|image: ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}|g" kubernetes/deployment.yaml
                    sed -i "s|image: .*filmograph-fe.*|image: ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}|g" kubernetes/deployment-fe.yaml
                    kubectl apply -k kubernetes/
                """
            }
        }
    }
}
