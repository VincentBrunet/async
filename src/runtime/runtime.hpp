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

struct function_data {
};

using function = std::shared_ptr<function_data>;

struct object_data {
};

using object = std::shared_ptr<object_data>;

struct string {
};

union any {
};

struct unknown {
};

struct null {
};

}  // namespace ac

// #include "ref/RefStrong.hpp"
//#include "ref/RefWeak.hpp"

#endif