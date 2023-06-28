#include "atomic_behaviours.h"

void random_movement(int left, int right, int delat_ms)
{
    motors.write(left, right);
    delay(delat_ms);
}
