#include "atomic_behaviours.h"

void move_back(int left, int right, int delat_ms)
{
    random_movement(left * -1, right * -1, delat_ms);
    motors.stop();
}
