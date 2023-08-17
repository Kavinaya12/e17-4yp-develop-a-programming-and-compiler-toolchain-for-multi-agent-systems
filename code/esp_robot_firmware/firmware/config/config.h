
// This is the configuration file for the robot
// Fill all the required the parameters and
// rename this file as 'config.h' before use

#ifndef _ROBOT_CONFIG_H
#define _ROBOT_CONFIG_H

// ---------------------------------------------------------- MQTT Communication
#ifdef ENABLE_MQTT
#define MQTT_SERVER ""
#define MQTT_PORT 
#define MQTT_CLIENT ""
#define MQTT_USERNAME ""
#define MQTT_PASSWORD ""
#endif

// ------------------------------------------------------------- WiFi Client API
#ifdef ENABLE_WIFI_CLIENT

#define HOST "";
#define PORT 

#endif

// ------------------------------------------------------------ WiFi Credentials
// #define WIFI_SSID "Dialog 4G PRE"
// #define WIFI_PASS "thisakuttige"

#define WIFI_SSID "Dialog 4G 733"
#define WIFI_PASS "b71617D3"

#define OTA_SERVER_IP ""
#define OTA_SERVER_PORT ""

// const char* ssid = WIFI_SSID;
// const char* password = WIFI_PASS;

#endif