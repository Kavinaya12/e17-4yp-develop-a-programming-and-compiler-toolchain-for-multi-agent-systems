#include "atomic_behaviours.h"

void random_turn(int angle, int delat_ms)
{
    int random = (rand() % 100);
    int sign = (random % 2 == 0) ? 1 : -1;
    Serial.printf("random: %d, sign: %d \n", random, sign);

    Serial.println("random turn \n");
    random_movement(angle * sign, -angle * sign, delat_ms);
    motors.stop();
}
