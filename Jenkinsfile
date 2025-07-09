pipeline {
    agent any
    tools {
        nodejs 'NodeJS 20.19.3'
    }
    environment{
        DEPLOY_DIR = '/var/sites/lydoc.me/index' // 部署目录
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                // 这里执行打包命令，举例：npm、maven、gradle 等
                sh 'node -v'
                sh 'npm i'
                sh 'rm -rf dist || true'
                sh 'npm run build'
                sh 'rm -rf ${DEPLOY_DIR}/* || true'  
                sh 'cp -r docs/.vitepress/dist/* ${DEPLOY_DIR}'  
            }
        }
    }
}