#ifndef __runtime_H
#define __runtime_H

#include <cinttypes>
#include <memory>

#include "ref/RefStrong.hpp"

namespace ac {

typedef uint8_t u8;
typedef uint16_t u16;
typedef uint32_t u32;
typedef uint64_t u64;

typedef int8_t i8;
typedef int16_t i16;
typedef int32_t i32;
typedef int64_t i64;

typedef float f32;
typedef double f64;

typedef uintptr_t pointer;

typedef uint8_t boolean;

template <typename TR>
class callable0 {
 public:
  TR(*ptr)
  (void *);
  TR call() {
    return this->ptr(this);
  }
};
template <typename TR, typename TP1>
class callable1 {
 public:
  TR(*ptr)
  (void *, TP1);
  TR call(TP1 p1) {
    return this->ptr(this, p1);
  }
};
template <typename TR, typename TP1, typename TP2>
class callable2 {
 public:
  TR(*ptr)
  (void *, TP1, TP2);
  TR call(TP1 p1, TP2 p2) {
    return this->ptr(this, p1, p2);
  }
};
template <typename TR, typename TP1, typename TP2, typename TP3>
class callable3 {
 public:
  TR(*ptr)
  (void *, TP1, TP2, TP3);
  TR call(TP1 p1, TP2 p2, TP3 p3) {
    return this->ptr(this, p1, p2, p3);
  }
};
template <typename TR, typename TP1, typename TP2, typename TP3, typename TP4>
class callable4 {
 public:
  TR(*ptr)
  (void *, TP1, TP2, TP3, TP4);
  TR call(TP1 p1, TP2 p2, TP3 p3, TP4 p4) {
    return this->ptr(this, p1, p2, p3, p4);
  }
};

template <typename TR>
using function0 = std::shared_ptr<callable0<TR> >;

template <typename TR, typename TP1>
using function1 = std::shared_ptr<callable1<TR, TP1> >;

template <typename TR, typename TP1, typename TP2>
using function2 = std::shared_ptr<callable2<TR, TP1, TP2> >;

template <typename TR, typename TP1, typename TP2, typename TP3>
using function3 = std::shared_ptr<callable3<TR, TP1, TP2, TP3> >;

template <typename TR, typename TP1, typename TP2, typename TP3, typename TP4>
using function4 = std::shared_ptr<callable4<TR, TP1, TP2, TP3, TP4> >;

struct object_type {
};

struct object_data {
};

struct object_mem {
  object_type *type;
  object_data *data;
};

// using object = std::shared_ptr<object_mem>;

struct field {
};

struct string {
};

union any {
};

struct unknown {
};

struct null {
};

string str_make(char *str);
null null_make();

extern void *(*entry_module)();

}  // namespace ac

#endif
