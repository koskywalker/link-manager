<template>
  <div class="shortcut-area">
    <p class="shortcut__title">便利なショートカットキー一覧</p>
    <div class="shortcut__body">
      <ul class="shortcut__items">
        <li class="shortcut__item">
          <p class="shortcut__item__label">Tab</p>
          <p class="shortcut__item__text">次のアイテムへ</p>
        </li>
        <li class="shortcut__item">
          <p class="shortcut__item__label">Shift + Tab</p>
          <p class="shortcut__item__text">前のアイテムへ</p>
        </li>
        <li class="shortcut__item">
          <p class="shortcut__item__label">（アイテム選択時）Space</p>
          <p class="shortcut__item__text">アイテムのURLをコピー</p>
        </li>
        <li class="shortcut__item">
          <p class="shortcut__item__label">（アイテム選択時）J</p>
          <p class="shortcut__item__text">アイテムのURL先を別タブで開く</p>
        </li>
        <li class="shortcut__item">
          <p class="shortcut__item__label mb-1">（アイテム選択時）E</p>
          <p class="shortcut__item__text mb-1">アイテムを編集</p>
        </li>
        <li class="shortcut__item">
          <p class="shortcut__item__label mb-1">（アイテム選択時）D</p>
          <p class="shortcut__item__text mb-1">アイテムを削除</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.shortcut-area {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 12px;
  padding: 15px;
}

.shortcut__title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.shortcut__items {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

.shortcut__item {
  display: flex;
  width: 50%;
}

.shortcut__item__label {
  font-weight: bold;
  margin-right: 15px;
  text-align: right;
  width: 40%;
}

.shortcut__item__text {
  width: 50%;
}
</style>
