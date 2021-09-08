#include <function_make.h>

#include <value_make.h>

t_value *function_make(t_type *type, void *callable, t_u32 size)
{
  t_value *value = value_make(type);
  value->data.function.closure = calloc(size, sizeof(t_ref *));
  value->data.function.callable = callable;
  return value;
}

t_value *function_make_0(t_type *type, void *callable)
{
  t_value *value = function_make(type, callable, 0);
  return value;
}

t_value *function_make_1(t_type *type, void *callable, t_ref *r1)
{
  t_value *value = function_make(type, callable, 1);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  return value;
}

t_value *function_make_2(t_type *type, void *callable, t_ref *r1, t_ref *r2)
{
  t_value *value = function_make(type, callable, 2);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  return value;
}

t_value *function_make_3(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3)
{
  t_value *value = function_make(type, callable, 3);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  return value;
}

t_value *function_make_4(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4)
{
  t_value *value = function_make(type, callable, 4);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  return value;
}

t_value *function_make_5(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5)
{
  t_value *value = function_make(type, callable, 5);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  return value;
}

t_value *function_make_6(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6)
{
  t_value *value = function_make(type, callable, 6);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  return value;
}

t_value *function_make_7(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7)
{
  t_value *value = function_make(type, callable, 7);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  closure[6] = r7;
  return value;
}

t_value *function_make_8(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8)
{
  t_value *value = function_make(type, callable, 8);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  closure[6] = r7;
  closure[7] = r8;
  return value;
}

t_value *function_make_9(t_type *type, void *callable, t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8, t_ref *r9)
{
  t_value *value = function_make(type, callable, 9);
  t_ref **closure = value->data.function.closure;
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  closure[6] = r7;
  closure[7] = r8;
  closure[8] = r9;
  return value;
}

t_value *function_make_x(t_type *type, void *callable, t_u32 size, ...)
{
  t_value *value = function_make(type, callable, size);
  if (size > 0)
  {
    t_ref **closure = value->data.function.closure;
    va_list rX;
    va_start(rX, size);
    for (t_u32 idx = 0; idx < size; idx++)
    {
      closure[idx] = va_arg(rX, t_ref *);
    }
    va_end(rX);
  }
  return value;
}
