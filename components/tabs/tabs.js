// components/tabs/tabs.js
Component({
  properties: {
    title: {
      type: Array,
      value: []
    }
  },

  data: {
    titleItem: []
  },

  lifetimes: {
    attached() {
      let titleItem = this.data.title.map((value, index) => {
        return {
          id: index,
          value,
          active: false
        }
      });
      titleItem[0].active = true;
      this.setData({
        titleItem
      });
    }
  },

  methods: {
    handleTap(e) {
      const { index } = e.currentTarget.dataset;
      let titleItem = JSON.parse(JSON.stringify(this.data.titleItem));
      titleItem.forEach(v => {v.active = false});
      titleItem[index].active = true;
      this.triggerEvent('contentChange', index);
      this.setData({
        titleItem
      });
    }
  }
})
