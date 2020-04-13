<template>
	<div class="card shadow">
		<div class="card-header">
			<router-link :to="{ name: 'matpel.create' }" class="btn btn-info btn-sm">
				<i class="cil-plus"></i> Tambah matpel
			</router-link> 
		</div>
		<div class="card-body">
			<b-table
		      id="table-transition-example"
		      :items="matpels"
		      :fields="fields"
		      striped
		      small
		      primary-key="name"
		      :tbody-transition-props="transProps"
		    >
		    	<template v-slot:cell(actions)="row">
                    <b-dropdown text="Aksi" size="sm" variant="info">
					    <b-dropdown-item>Hapus</b-dropdown-item>
					</b-dropdown>
                </template>
		    </b-table>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import { BTable, BDropdown } from 'bootstrap-vue'

	export default {
		name: 'MatpelData',
		components: {
			BTable,
			BDropdown
		},
		data() {
			return {
				transProps: {
		          name: 'flip-list'
		        },
		        fields: [
		          { key: 'name', sortable: true },
		          { key: 'actions', label: 'Aski' }
		        ]
			}
		},
		computed: {
			...mapState('matpel', {
				matpels: state => state.matpels
			})
		},
		methods: {
			...mapActions('matpel', ['getAllMatpels'])
		},
		created() {
			this.getAllMatpels();
		}
	}
</script>
<style type="text/css">
	table#table-transition-example .flip-list-move {
	  transition: transform 1s;
	}
</style>