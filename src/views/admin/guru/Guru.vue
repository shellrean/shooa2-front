<template>
	<div class="card shadow">
		<div class="card-header">
			<router-link :to="{ name: 'guru.create' }" class="btn btn-sm btn-info">
				<i class="cil-plus"></i> Tambah guru
			</router-link>
		</div>
		<div class="card-body">
			<b-table
		      id="table-transition-example"
		      :items="users"
		      :fields="fields"
		      striped
		      small
		      primary-key="name"
		      :tbody-transition-props="transProps"
		    >
		    <template v-slot:cell(actions)="row">
                   <b-dropdown text="Aksi" size="sm" variant="info">
				    <b-dropdown-item @click="deleteUser(row.item._id)"><i class="cil-trash"></i> Hapus</b-dropdown-item>
				</b-dropdown>
               </template>
			</b-table>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex'
	import { BButton, BTable, BDropdown } from 'bootstrap-vue'

	export default {
		name: 'GuruData',
		components: {
			BTable,
			BDropdown,
			BButton
		},
		data() {
			return {
				transProps: {
		          name: 'flip-list'
		        },
		        fields: [
		          { key: 'name', label: 'Nama', sortable: true },
		          { key: 'email', label: 'Email', sortable : true },
		          { key: 'actions', label: 'Aski' }
		        ]
			}
		},
		computed: {
			...mapState('user', {
				users: state => state.users
			})
		},
		methods: {
			...mapActions('user',['getAllUser','removeUser']),
			deleteUser(id) {
				this.$swal({
	                title: 'Informasi',
	                text: "Tindakan ini akan menghapus secara permanent!",
	                icon: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#3085d6',
	                cancelButtonColor: '#c7c7c7',
	                confirmButtonText: 'Iya, Lanjutkan!'
	            }).then((result) => {
	                if (result.value) {
	                    this.removeUser(id)
	                    .then(() => {
	                        this.getAllUser('teacher')
	                    })
	                    .catch((err) => {
	                        
	                    })
	                }
	            })
			}
		},
		created() {
			this.getAllUser('teacher')
		}
	}
</script>