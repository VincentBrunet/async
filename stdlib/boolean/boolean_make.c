#include <boolean_make.h>

#include <value_make.h>

t_value *boolean_true = NULL;
t_value *boolean_false = NULL;

t_value *boolean_make(t_boolean value)
{
  if (value == FALSE)
  {
    if (boolean_false == NULL)
    {
      boolean_false = value_make(type_boolean);
      boolean_false->content.boolean = FALSE;
    }
    return boolean_false;
  }
  else
  {
    if (boolean_true == NULL)
    {
      boolean_true = value_make(type_boolean);
      boolean_true->content.boolean = TRUE;
    }
    return boolean_true;
  }
}
