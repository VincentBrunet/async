#include <object_call.h>

#include <closures.h>

t_value *object_call_0(t_value *(callable)(t_closure *))
{
  t_closure closure;
  closure_init(&closure, 0);
  return callable(&closure);
}

t_value *object_call_1(t_value *(callable)(t_closure *), t_variable *d1)
{
  t_closure closure;
  closure_init(&closure, 1);
  closure.variables[0] = d1;
  return callable(&closure);
}

t_value *object_call_2(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2)
{
  t_closure closure;
  closure_init(&closure, 2);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  return callable(&closure);
}

t_value *object_call_3(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3)
{
  t_closure closure;
  closure_init(&closure, 3);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  closure.variables[2] = d3;
  return callable(&closure);
}

t_value *object_call_4(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4)
{
  t_closure closure;
  closure_init(&closure, 4);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  closure.variables[2] = d3;
  closure.variables[3] = d4;
  return callable(&closure);
}

t_value *object_call_5(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5)
{
  t_closure closure;
  closure_init(&closure, 5);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  closure.variables[2] = d3;
  closure.variables[3] = d4;
  closure.variables[4] = d5;
  return callable(&closure);
}

t_value *object_call_6(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6)
{
  t_closure closure;
  closure_init(&closure, 6);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  closure.variables[2] = d3;
  closure.variables[3] = d4;
  closure.variables[4] = d5;
  closure.variables[5] = d6;
  return callable(&closure);
}

t_value *object_call_7(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7)
{
  t_closure closure;
  closure_init(&closure, 7);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  closure.variables[2] = d3;
  closure.variables[3] = d4;
  closure.variables[4] = d5;
  closure.variables[5] = d6;
  closure.variables[6] = d7;
  return callable(&closure);
}

t_value *object_call_8(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8)
{
  t_closure closure;
  closure_init(&closure, 8);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  closure.variables[2] = d3;
  closure.variables[3] = d4;
  closure.variables[4] = d5;
  closure.variables[5] = d6;
  closure.variables[6] = d7;
  closure.variables[7] = d8;
  return callable(&closure);
}

t_value *object_call_9(t_value *(callable)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8, t_variable *d9)
{
  t_closure closure;
  closure_init(&closure, 9);
  closure.variables[0] = d1;
  closure.variables[1] = d2;
  closure.variables[2] = d3;
  closure.variables[3] = d4;
  closure.variables[4] = d5;
  closure.variables[5] = d6;
  closure.variables[6] = d7;
  closure.variables[7] = d8;
  closure.variables[8] = d9;
  return callable(&closure);
}

t_value *object_call_x(t_value *(callable)(t_closure *), t_u32 size, ...)
{
  t_closure closure;
  closure_init(&closure, size);
  if (size > 0)
  {
    va_list keys;
    va_start(keys, size);
    for (t_u32 idx = 0; idx < size; idx++)
    {
      closure.variables[idx] = va_arg(keys, t_variable *);
    }
    va_end(keys);
  }
  return callable(&closure);
}
