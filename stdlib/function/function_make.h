#ifndef __function_make_H
#define __function_make_H

#include <types.h>

t_value *function_make_0(t_type *type, void *callable);
t_value *function_make_1(t_type *type, void *callable, t_variable *d1);
t_value *function_make_2(t_type *type, void *callable, t_variable *d1, t_variable *d2);
t_value *function_make_3(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3);
t_value *function_make_4(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4);
t_value *function_make_5(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5);
t_value *function_make_6(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6);
t_value *function_make_7(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7);
t_value *function_make_8(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8);
t_value *function_make_9(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8, t_variable *d9);

t_value *function_make_x(t_type *type, void *callable, t_u32 size, ...);

#endif
