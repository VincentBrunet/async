#include "functions.h"
#include "values.h"

/**
 * Global utils
 */

/*
void function_init(t_function *function, t_u32 size) {
  function->size = size;
  if (size > 0) {
    function->variables = calloc(size, sizeof(t_variable));
  }
}
*/

t_value *function_call(t_function *function) {
  return value_null;
}
