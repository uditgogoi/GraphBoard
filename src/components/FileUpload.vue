<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :accept="allowedFiles"
      :http-request="handleUpload"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">Only .csv and .xls files allowed</div>
      </template>
    </el-upload>
  </div>
</template>
<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { ref,onMounted } from "vue";

const fileList = ref([]);
const parsedData = ref([]);
const props= defineProps(['files'])
const emits = defineEmits(["upload"]);
const allowedFiles=ref('');

const onUploadSuccess = (e) => {
  console.log(e);
};


onMounted(()=> {
  console.log(props.files)
  allowedFiles.value= props.files.join(", ")
})

const handleUpload = ({ file }) => {
  fileList.value.push(file);
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = (event) => {
    const data = event.target.result;
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      parsedData.value = parseExcel(data);
    } else if (file.type === "text/csv") {
      parsedData.value = parseCSV(data);
    }
    emits("upload", parsedData.value);
  };
  reader.onerror = function (ex) {
    console.log(ex);
  };


  // reader.readAsBinaryString(file.raw);
};

const beforeUpload = (file) => {
  const isExcelOrCSV =
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "text/csv";
  if (!isExcelOrCSV) {
    ElMessage.error("Only Excel and CSV files are allowed!");
  }
  return isExcelOrCSV;
};

const parseExcel = (data) => {
  // const workbook = XLSX.read(data, { type: "binary" });
  // const sheetName = workbook.SheetNames[0];
  // const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
  //   header: 1,
  // });
  // parsedData.value = worksheet;
  // console.log(parsedData);
  // ElMessage.success("Excel file parsed successfully");
  const workbook = XLSX.read(data, {
    type: "binary",
  });
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  return jsonData;
};

const parseCSV = (data) => {
  Papa.parse(data, {
    complete: (results) => {
      parsedData.value = results.data;
      ElMessage.success("CSV file parsed successfully");
    },
    header: false,
  });
};

const handleRemove = (file, fileList) => {
  fileList.value = fileList;
  parsedData.value = [];
  emits("upload", parsedData.value);
  // ElMessage.success(`File ${file.name} removed successfully`);
};
</script>

<!-- 
.csv, .xls, .xlsx, text/csv, application/csv,
text/comma-separated-values, application/csv, application/excel,
application/vnd.msexcel, text/anytext, application/vnd. ms-excel,
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet -->