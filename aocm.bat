@echo off

set /p year="Enter Year: "

cd %year%
node main.js
cd ../
