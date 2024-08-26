#!/bin/zsh

gnome-terminal --tab --title="Config Server" -- zsh -c "mvn -pl config-server spring-boot:run; exec zsh"
sleep 2
gnome-terminal --tab --title="Server Discovery" -- zsh -c "mvn -pl server-discovery spring-boot:run; exec zsh"
sleep 2
gnome-terminal --tab --title="Gateway Service" -- zsh -c "mvn -pl gateway-service spring-boot:run; exec zsh"
sleep 2

gnome-terminal --tab --title="User Service" -- zsh -c "mvn -pl user-service spring-boot:run; exec zsh"
gnome-terminal --tab --title="Authentication Service" -- zsh -c "mvn -pl authentication-service spring-boot:run; exec zsh"
gnome-terminal --tab --title="Book Service" -- zsh -c "mvn -pl book-service spring-boot:run; exec zsh"
gnome-terminal --tab --title="File Service" -- zsh -c "mvn -pl file-service spring-boot:run; exec zsh"

wait
