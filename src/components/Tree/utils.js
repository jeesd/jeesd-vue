/**
 * @param arr 数组对象
 * @param parent 是否只获取父一层的属性
 * @description 递归获取需要的数据
 */
export function getTreeKey(arr, parent = false) {
  const dataList = [];
  const generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const { key, title, children } = data[i];
      if (!parent) dataList.push({ key, title });
      if (Array.isArray(children) && children.length > 0) {
        if (parent) dataList.push({ key, title });
        generateList(children);
      }
    }
  };
  generateList(arr);
  return dataList.map(item => item.key);
}

//用法
/**
<tree-panel
          :treeData="treeData" //整个树的数据
          :expandedKeys="treeExpandedKeys" //展开的数组key
          :checkedKeys="treeCheckedKeys" //选中的数组key
          @change="onTreePanelChange" //拿到返回值的回调函数
/>
**/