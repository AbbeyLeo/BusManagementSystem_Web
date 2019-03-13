<template>
	<div class="card-body card-block blo">
        <div class="row form-group">
                <div class="col col-md-2 ipm-start">
                    <select name="select" data-placeholder="请选择" id="select" class="form-control" tabindex="1">
                        <option value="" label="请选择" ></option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                    </select>
                </div>
                <div class="col col-md-4 ipm"><input type="text" id="text-input" name="text-input" placeholder="输入值查询" class="form-control"></div>
                 <div class="col col-md-1 ipm"><button type="button" class="btn btn-primary">查询</button></div>
        				<div class="col col-md-6">
                         <button type="button" class="btn btn-primary bbtn">添加</button>
                         <button type="button" class="btn btn-primary bbtn">修改</button>
                         <button type="button" class="btn btn-danger bbtn">删除</button>
          			</div>
        </div>
    </div>
</template>

<script>
</script>

<style>
</style>