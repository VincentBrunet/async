#include <number_i32_make.h>
#include <value_make.h>

t_value *number_i32_make(t_i32 number) {
  t_value *value = value_make(type_i32);
  value->data.i32 = number;
  return value;
}
