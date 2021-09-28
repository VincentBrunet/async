#include <object/object_make.h>
#include <value/value_make.h>

t_value *object_make(t_type *type, t_u32 size) {
  t_value *value = value_make(type);
  value->data.object.size = size;
  if (size > 0) {
    value->data.object.fields = calloc(size, sizeof(t_field));
  }
  return value;
}

t_value *object_make_0(t_type *type) {
  t_value *value = object_make(type, 0);
  return value;
}

t_value *object_make_1(t_type *type, t_u64 key1) {
  t_value *value = object_make(type, 1);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  return value;
}

t_value *object_make_2(t_type *type, t_u64 key1, t_u64 key2) {
  t_value *value = object_make(type, 2);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  return value;
}

t_value *object_make_3(t_type *type, t_u64 key1, t_u64 key2, t_u64 key3) {
  t_value *value = object_make(type, 3);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  fields[2].key = key3;
  return value;
}

t_value *object_make_4(t_type *type, t_u64 key1, t_u64 key2, t_u64 key3, t_u64 key4) {
  t_value *value = object_make(type, 4);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  fields[2].key = key3;
  fields[3].key = key4;
  return value;
}

t_value *object_make_5(t_type *type, t_u64 key1, t_u64 key2, t_u64 key3, t_u64 key4, t_u64 key5) {
  t_value *value = object_make(type, 5);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  fields[2].key = key3;
  fields[3].key = key4;
  fields[4].key = key5;
  return value;
}

t_value *object_make_6(t_type *type, t_u64 key1, t_u64 key2, t_u64 key3, t_u64 key4, t_u64 key5, t_u64 key6) {
  t_value *value = object_make(type, 6);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  fields[2].key = key3;
  fields[3].key = key4;
  fields[4].key = key5;
  fields[5].key = key6;
  return value;
}

t_value *object_make_7(t_type *type, t_u64 key1, t_u64 key2, t_u64 key3, t_u64 key4, t_u64 key5, t_u64 key6, t_u64 key7) {
  t_value *value = object_make(type, 7);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  fields[2].key = key3;
  fields[3].key = key4;
  fields[4].key = key5;
  fields[5].key = key6;
  fields[6].key = key7;
  return value;
}

t_value *object_make_8(t_type *type, t_u64 key1, t_u64 key2, t_u64 key3, t_u64 key4, t_u64 key5, t_u64 key6, t_u64 key7, t_u64 key8) {
  t_value *value = object_make(type, 8);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  fields[2].key = key3;
  fields[3].key = key4;
  fields[4].key = key5;
  fields[5].key = key6;
  fields[6].key = key7;
  fields[7].key = key8;
  return value;
}

t_value *object_make_9(t_type *type, t_u64 key1, t_u64 key2, t_u64 key3, t_u64 key4, t_u64 key5, t_u64 key6, t_u64 key7, t_u64 key8, t_u64 key9) {
  t_value *value = object_make(type, 9);
  t_field *fields = value->data.object.fields;
  fields[0].key = key1;
  fields[1].key = key2;
  fields[2].key = key3;
  fields[3].key = key4;
  fields[4].key = key5;
  fields[5].key = key6;
  fields[6].key = key7;
  fields[7].key = key8;
  fields[8].key = key9;
  return value;
}

t_value *object_make_x(t_type *type, t_u32 size, ...) {
  t_value *value = object_make(type, size);
  if (size > 0) {
    t_field *fields = value->data.object.fields;
    va_list keys;
    va_start(keys, size);
    for (t_u32 idx = 0; idx < size; idx++) {
      fields[idx].key = va_arg(keys, t_u64);
    }
    va_end(keys);
  }
  return value;
}
