#include <i32/i32_make.h>
#include <value/value_make.h>

t_value *i32_make(t_i32 number) {
  t_value *value = value_make(type_i32);
  value->data.i32 = number;
  return value;
}
