#ifndef __runtime_H
#define __runtime_H

#include <cinttypes>
#include <memory>

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

template <typename T>
using ref = std::shared_ptr<T>;

template <typename TR>
struct callable0 {
  TR call() {
  }
};
template <typename TR, typename TP1>
struct callable1 {
  TR call(TP1 p1) {
  }
};
template <typename TR, typename TP1, typename TP2>
struct callable2 {
  TR call(TP1 p1, TP2 p2) {
  }
};
template <typename TR, typename TP1, typename TP2, typename TP3>
struct callable3 {
  TR call(TP1 p1, TP2 p2, TP3 p3) {
  }
};
template <typename TR, typename TP1, typename TP2, typename TP3, typename TP4>
struct callable4 {
  TR call(TP1 p1, TP2 p2, TP3 p3, TP4 p4) {
  }
};

template <typename TR>
struct function0 : ref<callable0<TR> > {
};
template <typename TR, typename TP1>
struct function1 : ref<callable1<TR, TP1> > {
};
template <typename TR, typename TP1, typename TP2>
struct function2 : ref<callable2<TR, TP1, TP2> > {
};
template <typename TR, typename TP1, typename TP2, typename TP3>
struct function3 : ref<callable3<TR, TP1, TP2, TP3> > {
};
template <typename TR, typename TP1, typename TP2, typename TP3, typename TP4>
struct function4 : ref<callable4<TR, TP1, TP2, TP3, TP4> > {
};

struct object_type {
};

struct object_data {
};

struct object_mem {
  object_type *type;
  object_data *data;
};

using object = ref<object_mem>;

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

string str_make(char *str) {
  return {};
}
null null_make() {
  return {};
}

}  // namespace ac

#endif