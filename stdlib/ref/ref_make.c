#include <ref/ref_make.h>

t_ref *ref_make(t_value *value) {
  t_ref *ref = calloc(1, sizeof(t_ref));
  ref->value = value;
  return ref;
}
