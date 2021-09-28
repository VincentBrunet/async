
#include <i32/i32_binary.h>
#include <i32/i32_make.h>

t_value *i32_addition(t_value *v1, t_value *v2) {
  return i32_make(v1->data.i32 + v2->data.i32);
}

t_value *i32_substraction(t_value *v1, t_value *v2) {
  return i32_make(v1->data.i32 - v2->data.i32);
}

t_value *i32_multiplication(t_value *v1, t_value *v2) {
  return i32_make(v1->data.i32 * v2->data.i32);
}

t_value *i32_division(t_value *v1, t_value *v2) {
  return i32_make(v1->data.i32 / v2->data.i32);
}

t_value *i32_modulo(t_value *v1, t_value *v2) {
  return i32_make(v1->data.i32 % v2->data.i32);
}
