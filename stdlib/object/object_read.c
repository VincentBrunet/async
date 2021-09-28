#include <object/object_read.h>

int object_read_compare(const void *a, const void *b) {
  t_u64 keyA = ((t_field *)a)->key;
  t_u64 keyB = ((t_field *)b)->key;
  if (keyA == keyB) {
    return 0;
  } else if (keyA > keyB) {
    return 1;
  } else {
    return -1;
  }
}

t_ref *object_read(t_value *value, t_u64 key) {
  t_field dummy;
  dummy.key = key;
  void *result = bsearch(
      &dummy,
      value->data.object.fields,
      value->data.object.size,
      sizeof(t_field),
      object_read_compare);
  return ((t_ref *)result);
}
