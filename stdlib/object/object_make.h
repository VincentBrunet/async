#ifndef __object_make_H
#define __object_make_H

#include <types.h>

t_value *object_make_0(t_type *type);
t_value *object_make_1(t_type *type, t_u32 key1);
t_value *object_make_2(t_type *type, t_u32 key1, t_u32 key2);
t_value *object_make_3(t_type *type, t_u32 key1, t_u32 key2, t_u32 key3);
t_value *object_make_4(t_type *type, t_u32 key1, t_u32 key2, t_u32 key3, t_u32 key4);
t_value *object_make_5(t_type *type, t_u32 key1, t_u32 key2, t_u32 key3, t_u32 key4, t_u32 key5);
t_value *object_make_6(t_type *type, t_u32 key1, t_u32 key2, t_u32 key3, t_u32 key4, t_u32 key5, t_u32 key6);
t_value *object_make_7(t_type *type, t_u32 key1, t_u32 key2, t_u32 key3, t_u32 key4, t_u32 key5, t_u32 key6, t_u32 key7);
t_value *object_make_8(t_type *type, t_u32 key1, t_u32 key2, t_u32 key3, t_u32 key4, t_u32 key5, t_u32 key6, t_u32 key7, t_u32 key8);
t_value *object_make_9(t_type *type, t_u32 key1, t_u32 key2, t_u32 key3, t_u32 key4, t_u32 key5, t_u32 key6, t_u32 key7, t_u32 key8, t_u32 key9);

t_value *object_make_x(t_type *type, t_u32 size, ...);

#endif
