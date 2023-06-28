#pragma once

#include "modules/neopixel/neopixel.h"
#include "modules/motors/motors.h"
#include "mqtt/mqtt.h"

void random_movement(int left, int right, int delat_ms);
int read_distance();
void read_color(color_t *obsColor);
void move_back(int left, int right, int delat_ms);
void random_turn(int angle, int delat_ms);