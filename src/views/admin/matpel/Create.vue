<template>
	<div class="card shadow">
		<div class="card-header">
			<router-link :to="{ name: 'matpel.data' }" class="btn btn-light btn-sm">
				<i class="cil-action-undo"></i> Kembali
			</router-link> 
		</div>
		<div class="card-body">
			<div class="form-group">
				<label>Nama matpel</label>
				<input type="text" class="form-control" name="" placeholder="Nama matpel">
			</div>
			<div class="form-group">
				<button class="btn btn-info btn-sm"><i class="cil-save"></i> Simpan</button>
			</div>
		</div>
		<div class="card-footer"></div>
	</div>
</template>