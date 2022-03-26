#include <i32/i32_binary.h>
#include <i32/i32_make.h>

t_value *i32_positive(t_value *v) {
  return i32_make(+v->data.i32);
}

t_value *i32_negative(t_value *v) {
  return i32_make(-v->data.i32);
}
