#!/bin/bash

# 프로세스가 실행 중인 디렉토리
PROCESS_DIR="/app/card-study-ui/server"

# 기존 프로세스 종료
echo "Stopping the existing process..."
pkill -f "$PROCESS_DIR"

# 잠시 대기하여 종료 확인
sleep 5

# 새로운 프로세스 시작
echo "Starting the new process..."
cd "$PROCESS_DIR"
PORT=nohup ./your_executable_command > /dev/null 2>&1 &

echo "Script executed successfully."
