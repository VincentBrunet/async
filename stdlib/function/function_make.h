#ifndef __function_make_H
#define __function_make_H

#include <core/core_struct.h>

t_value *function_make_0(t_type *type, void *callable);
t_value *function_make_1(t_type *type, void *callable, t_ref *r1);
t_value *function_make_2(t_type *type, void *callable, t_ref *r1, t_ref *r2);
t_value *function_make_3(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3);
t_value *function_make_4(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4);
t_value *function_make_5(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5);
t_value *function_make_6(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6);
t_value *function_make_7(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7);
t_value *function_make_8(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8);
t_value *function_make_9(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8, t_ref *r9);

t_value *function_make_x(t_type *type, void *callable, t_u32 size, ...);

#endif
