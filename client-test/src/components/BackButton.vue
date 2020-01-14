<template>
    <button @click="$router.back()">
        <slot>返回</slot>
    </button>
</template>

<style scoped>
button {
  padding: 6px 15px;
  border: none;
  outline: none;
  cursor: pointer;
  background: rgb(29, 139, 29);
  color: #fff;
  border-radius: 4px;
}

button:hover {
  background: rgb(13, 105, 13);
}
</style>

