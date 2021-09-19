#include <null/null_make.h>
#include <value/value_make.h>

t_value *null_make() {
  static t_value *null = NULL;
  if (null == NULL) {
    null = value_make(type_null);
  }
  return null;
}
