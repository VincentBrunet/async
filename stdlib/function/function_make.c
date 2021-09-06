#include <function_make.h>

#include <value_make.h>

t_value *function_make(t_type *type, void *callable, t_u32 size)
{
  t_value *value = value_make(type);
  value->content.function.callable = callable;
  closure_init((t_closure *)value, size);
  return value;
}

t_value *function_make_0(t_type *type, void *callable)
{
  t_value *value = function_make(type, callable, 0);
  return value;
}

t_value *function_make_1(t_type *type, void *callable, t_variable *d1)
{
  t_value *value = function_make(type, callable, 1);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  return value;
}

t_value *function_make_2(t_type *type, void *callable, t_variable *d1, t_variable *d2)
{
  t_value *value = function_make(type, callable, 2);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  return value;
}

t_value *function_make_3(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3)
{
  t_value *value = function_make(type, callable, 3);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  variables[2] = d3;
  return value;
}

t_value *function_make_4(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4)
{
  t_value *value = function_make(type, callable, 4);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  variables[2] = d3;
  variables[3] = d4;
  return value;
}

t_value *function_make_5(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5)
{
  t_value *value = function_make(type, callable, 5);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  variables[2] = d3;
  variables[3] = d4;
  variables[4] = d5;
  return value;
}

t_value *function_make_6(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6)
{
  t_value *value = function_make(type, callable, 6);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  variables[2] = d3;
  variables[3] = d4;
  variables[4] = d5;
  variables[5] = d6;
  return value;
}

t_value *function_make_7(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7)
{
  t_value *value = function_make(type, callable, 7);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  variables[2] = d3;
  variables[3] = d4;
  variables[4] = d5;
  variables[5] = d6;
  variables[6] = d7;
  return value;
}

t_value *function_make_8(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8)
{
  t_value *value = function_make(type, callable, 8);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  variables[2] = d3;
  variables[3] = d4;
  variables[4] = d5;
  variables[5] = d6;
  variables[6] = d7;
  variables[7] = d8;
  return value;
}

t_value *function_make_9(t_type *type, void *callable, t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8, t_variable *d9)
{
  t_value *value = function_make(type, callable, 9);
  t_variable **variables = value->content.function.closure.variables;
  variables[0] = d1;
  variables[1] = d2;
  variables[2] = d3;
  variables[3] = d4;
  variables[4] = d5;
  variables[5] = d6;
  variables[6] = d7;
  variables[7] = d8;
  variables[8] = d9;
  return value;
}

t_value *function_make_x(t_type *type, void *callable, t_u32 size, ...)
{
  t_value *value = function_make(type, callable, size);
  if (size > 0)
  {
    t_variable **variables = value->content.function.closure.variables;
    va_list dependencies;
    va_start(dependencies, size);
    for (t_u32 idx = 0; idx < size; idx++)
    {
      variables[idx] = va_arg(dependencies, t_variable *);
    }
    va_end(dependencies);
  }
  return value;
}
