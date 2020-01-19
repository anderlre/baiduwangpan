<template>
  <div id="app">
    <wlExplorer
      :upload-url="aa"
      ref="wl-explorer-cpt"
      :headerDropdown="headerHandle"
      :columns="file_table_columns"
      :all-path="all_folder_list"
      :is-folder-fn="isFolderFn"
      :folderType="rource_type"
      :data="file_table_data"
      :props="explorer_prop"
      @handleFolder="handleFolder"
      @search="fileSearch"
      @del="fileDel"
      @download="fileDownload"
      :uploadSuccess="fileUpload"
      @closeFade="closeOtherLayout(fade)"
    >
      <!-- 操作文件夹滑入区 -->
      <fadeIn v-show="fade.folder">
        <h3 class="edit-header">
          <p v-show="judge==='add'">新增文件夹</p>
          <p v-show="judge==='edit'">编辑文件夹</p>
        </h3>
        <el-scrollbar class="scroll">
          <el-form
            size="medium"
            ref="folder_form"
            label-position="top"
            :model="folder_form"
            :rules="folder_rules"
            class="folder_form rule-form"
            @keyup.enter.native="submitFolderFrom('folder_form')"
          >
            <el-form-item label="文件路径" prop="ParentId">
              <wlTreeSelect
                class="u-full"
                nodeKey="Id"
                placeholder="请选择文件路径"
                :props="tree_select_prop"
                :data="tree_folder_list"
                v-model="folder_form.ParentId"
              ></wlTreeSelect>
            </el-form-item>
            <el-form-item label="文件夹名称 " prop="Name">
              <el-input v-model="folder_form.Name" placeholder="请输入文件夹名称"></el-input>
            </el-form-item>
            <el-form-item label="备注说明" prop="Describe">
              <el-input
                :rows="3"
                type="textarea"
                v-model="folder_form.Describe"
                placeholder="请输入备注说明"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
        <div class="submit-btn-box">
          <submit-btn @btn="submitFolderFrom('folder_form')" :status="load.folder"></submit-btn>
          <el-button size="medium" @click="fade.folder = false">取消</el-button>
        </div>
      </fadeIn>
    </wlExplorer>
  </div>
</template>

<script>
   import wlExplorer from '../pages/WlExplorer'; // 导入文件管理器
  import fadeIn from "../components/fade-in"; // 导入文件管理器
  import submitBtn from "../components/submit-btn"; // 导入防抖提交组件
  import { closeOtherLayout, arrayToTree } from "../util"; // 导入关闭其他弹出类视图函数
  import {
    getFileListApi, // 1获取文件夹列表
    getAllFoldersApi, // 4获取全部文件夹
    delFileApi // 6删除文件|文件夹
  } from "../api"; // 导入接口
  const apiok = 200;

  export default {
    name: "app",
    components: {
      fadeIn,
      submitBtn,
       wlExplorer
    },
    data() {
      const _GB = 1024 * 1024;
      // const vm = this;
      return {
        judge:'',
        load: {
          folder: false
        }, // loading管理
        fade: {
          folder: false
        }, // 弹出类视图管理
        file_table_columns: [
          {
            label: "名称",
            prop: "Name",
            minWidth: 120
          },
          {
            label: "修改日期",
            align: "center",
            width: 120,
            formatter(row) {
              return row.EditTime.split("T")[0] || "-";
            }
          },
          {
            label: "类型",
            align: "center",
            width: 90,
            formatter(row) {
              return row.Type === 1 ? "文件夹" : row.SuffixName;
            }
          },
          {
            label: "大小",
            minWidth: 90,
            align: "center",
            formatter(row) {
              if (row.Size === null) return "-";
              if (row.Size < 1024) {
                // 1024以下显示kb
                return row.Size + "KB";
              }
              if (row.Size < _GB) {
                // 1024*1024
                let _mb = (row.Size / 1024).toFixed(2);
                return parseFloat(_mb) + "MB";
              }
              let _gb = (row.Size / _GB).toFixed(2);
              return parseFloat(_gb) + "GB";
            }
          },
          {
            label: "创建日期",
            align: "center",
            width: 120,
            formatter(row) {
              return row.CreateTime.split("T")[0] || "-";
            }
          },
          {
            label: "作者",
            minWidth: 100,
            align: "center",
            formatter(row) {
              return row.CreateUserName || "-";
            }
          },
          {
            label: "描述",
            minWidth: 100,
            formatter(row) {
              return row.Describe || "-";
            }
          }
        ], // 自定义表格列
        headerHandle: [], // 头部按钮更多操作-自定义权限
        file_table_data: [{ "Id": "1914aabb-487b-4f56-9dd2-1943c4ed99bb",
          "ProjectId": "bab2cc5d-30a0-4410-8b1f-2aabfd5cbc18",
          "ParentId": "00000000-0000-0000-0000-000000000000",
          "IdentityId": 1,
          "Parents": "",
          "Name": "的事",
          "RourceId": "00000000-0000-0000-0000-000000000000",
          "WBSId": "00000000-0000-0000-0000-000000000000",
          "RourceType": 1,
          "ISAllVisible": false,
          "Describe": "111",
          "CreateUserName": "蔚蓝",
          "CreateTime": "2019-11-01T09:29:44.79",
          "EditTime": "2019-11-07T17:34:44.383",
          "EditBy": "蔚蓝", "Type": 1,
          "FileType": 0, "PictuerCount": 0,
          "FilesCount": 0, "Size": null,
          "FileId": "00000000-0000-0000-0000-000000000000",
          "SuffixName": null,
          "PermissionType": 10
        },{ "Id": "1914aabb-487b-4f56-9dd2-1943c4ed99bb",
          "ProjectId": "bab2cc5d-30a0-4410-8b1f-2aabfd5cbc18",
          "ParentId": "00000000-0000-0000-0000-000000000000",
          "IdentityId": 1,
          "Parents": "",
          "Name": "我的",
          "RourceId": "00000000-0000-0000-0000-000000000000",
          "WBSId": "00000000-0000-0000-0000-000000000000",
          "RourceType": 1,
          "ISAllVisible": false,
          "Describe": "青春美少女",
          "CreateUserName": "美女",
          "CreateTime": "2019-11-01T09:29:44.79",
          "EditTime": "2019-11-07T17:34:44.383",
          "EditBy": "蔚蓝", "Type": 1,
          "FileType": 0, "PictuerCount": 0,
          "FilesCount": 0, "Size": null,
          "FileId": "00000000-0000-0000-0000-000000000000",
          "SuffixName": null,
          "PermissionType": 10
        },{ "Id": "faabd5c6-434d-4feb-9313-71dbeccac636", "ProjectId": "00000000-0000-0000-0000-000000000000",
          "ParentId": "00000000-0000-0000-0000-000000000000", "IdentityId": 0, "Parents": null,
          "Name": "music-player-logo", "RourceId": "00000000-0000-0000-0000-000000000000",
          "WBSId": "00000000-0000-0000-0000-000000000000", "RourceType": 1, "ISAllVisible": false,
          "Describe": null, "CreateUserName": "蔚蓝", "CreateTime": "2019-11-05T19:40:51.763", "EditTime": "2019-11-05T19:40:51.77",
          "EditBy": "蔚蓝", "Type": 2, "FileType": 1, "PictuerCount": 0, "FilesCount": 0,
          "Size": 0, "FileId": "d9e548de-5f5d-47d0-bb94-de137c324118", "SuffixName": "jpg", "PermissionType": 0 }, ], // 表格数据
        all_folder_list: [{ "Id": "1914aabb-487b-4f56-9dd2-1943c4ed99bb",
          "ProjectId": "bab2cc5d-30a0-4410-8b1f-2aabfd5cbc18",
          "ParentId": "00000000-0000-0000-0000-000000000000",
          "IdentityId": 1,
          "Parents": "",
          "Name": "的事",
          "RourceId": "00000000-0000-0000-0000-000000000000",
          "WBSId": "00000000-0000-0000-0000-000000000000",
          "RourceType": 1,
          "ISAllVisible": false,
          "Describe": "111",
          "CreateUserName": "蔚蓝",
          "CreateTime": "2019-11-01T09:29:44.79",
          "EditTime": "2019-11-07T17:34:44.383",
          "EditBy": "蔚蓝", "Type": 1,
          "FileType": 0, "PictuerCount": 0,
          "FilesCount": 0, "Size": null,
          "FileId": "00000000-0000-0000-0000-000000000000",
          "SuffixName": null,
          "PermissionType": 10
        },], // 所有文件夹列表
        tree_folder_list: [], // 树形文件夹列表
        type: {
          folder: 1,
          img: 2,
          video: 3,
          other: 4
        }, // 文件类型
        rource_type: {
          self: 1 // 自建
        }, // 数据来源类型
        explorer_prop: {
          name: "Name",
          match: "Name",
          splic: true,
          suffix: "SuffixName",
          pathId: "Id",
          pathPid: "ParentId",
          pathName: "Name"
        }, // 文件管理器配置项
        path: {}, // 路径数据
        folder_form: {
          ParentId: "",
          Name: "",
          Describe:'',
          preview: [],
          handle: []
        }, // 文件夹表单
        folder_rules: {
          Name: [{ required: true, message: "请填写文件夹名称", trigger: "blur" }]
        }, // 文件夹表单验证
        child_act_saved: {}, // 存储子组件数据，用于编辑更新
        tree_select_prop: {
          label: "Name",
          children: "Children"
        } // 树形下拉框配置项
      };
    },
    methods: {
      //文件上传
      fileUpload(res,file){
          console.log(res,file)
      },
      //文件下载
      fileDownload(file){
            console.log(file)
      },
      /**
       * 根据关键词搜索文件
       * file: Object 文件属性
       * update: Boolean 数据是否需要更新（不需要表示已存在）
       */
      fileSearch(file, update) {
        if (update) {
          this.path = file;
          this.getFileList();
        }
      },
      // 获取文件夹列表
      getFileList() {
        getFileListApi().then(({ data }) => {
          if (data.StatusCode === apiok) {
            this.file_table_data = data.Data || [];
          }
        });
      },
      /**
       * 编辑文件夹
       * act:Object 当前选中文件夹
       * type:String 操作类型 add添加edit编辑
       * file:Object 当前路径信息
       */
      handleFolder(act, type, file) {
        this.path = file;
        this.judge=type;
        console.log(this.judge)
        if(type==='edit'){
          this.folder_form.id=act.id
          this.folder_form.Name=act.Name;
          this.folder_form.Describe=act.Describe
        }
        this.fade.folder = true;
        if (type === "add") {
          this.$refs["folder_form"].resetFields();
          this.folder_form.Id = "";
          this.folder_form.ParentId = file.id;
          return;
        }
        this.child_act_saved = act;
      },
      // 提交文件夹表单
      submitFolderFrom(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.load.folder = true;
            setTimeout(()=>{
              this.load.folder = false;
              // let res_data = data.Data;
              let res_data = this.folder_form; // 由表单数据模拟服务器返回数据，此处应有服务器返回对应实体
              res_data.EditTime = res_data.CreateTime = '2019-11-11T11:11:11';
              res_data.Type = 1;
              if(!this.folder_form.Id){ // 新增
                if(this.folder_form.ParentId === this.path.id){ // 新增到当前路径
                  this.file_table_data.unshift(res_data)
                }else{ // 新增其他路径
                  let _new_data = {
                    id: res_data.Id,
                    pid: res_data.ParentId,
                    path: res_data.Name
                  };
                  this.$refs['wl-explorer-cpt'].updateHistoryData({Id:res_data.ParentId},[res_data]);
                }
              }else{ // 编辑
                this.child_act_saved.Name = res_data.Name;
                this.child_act_saved.Describe = res_data.Describe;
              }
              this.fade.folder = false;
              this.$message({
                showClose: true,
                message: '操作成功',
                type: "success"
              });
            },1000)
          } else {
            return false;
          }
        });
      },
      // 删除文件
      fileDel(data) {
        console.log('data',data)
      },
      // 获取所有文件夹
      getAllFolders() {
        let options = {
          id: this.explorer_prop.pathId,
          pid: this.explorer_prop.pathPid,
          children: "Children"
        };
        this.tree_folder_list = arrayToTree(this.all_folder_list, options);
      },
      // 判断是否文件夹函数
      isFolderFn(row) {
        return row.Type === this.type.folder;
      }
    },
    created() {
      this.closeOtherLayout = closeOtherLayout;
      this.getAllFolders();
      this.getFileList();
    }
  };
</script>
<style>
  #app {
    position: absolute;
    width: calc(100% - 105px);
    height: calc(100% - 35px);
  }
</style>

<!--
<template>
  <div>
    <div class="button">
      <el-button type="primary">下载<i class="el-icon-download el-icon&#45;&#45;right"></i></el-button>
      <el-upload
        style="display: none"
        class="upload-demo"
        action="#"
        :auto-upload="false"
        :on-change="fileChange"
        multiple
        :file-list="fileList">
      </el-upload>
      <el-button type="primary" @click="upload">点击上传<i class="el-icon-upload2 el-icon&#45;&#45;right"></i></el-button>
      <el-button type="primary">删除<i class="el-icon-delete el-icon&#45;&#45;right"></i></el-button>
    </div>
    <div style="font-size: 15px;margin-top: 15px;">全部文件</div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文件名">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AllFiles",
    data() {
      return {
        multipleSelection: [],
        fileList: [],
        tableData: [{
          name: '新建1',
          size: 220.4,
          date: '2019-02-03'
        },
          {
            name: '新建2',
            size: 220.4,
            date: '2019-02-03'
          },
          {
            name: '新建3',
            size: 220.4,
            date: '2019-02-03'
          }]
      }
    },
    methods: {
      upload() {
            document.querySelector('.upload-demo input').click()
      },
      fileChange(file, fileList) {
        console.log(file, fileList);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
    }
  }
</script>

<style scoped>
  .button {
    margin-top: 10px;
    font-size: 12px;
  }

  .table {
    margin-top: 15px;
  }
</style>
-->
