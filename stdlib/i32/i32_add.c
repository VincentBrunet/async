
#include <i32/i32_add.h>
#include <i32/i32_make.h>

t_value *i32_add(t_value *v1, t_value *v2) {
  return i32_make(v1->data.i32 + v2->data.i32);
}
