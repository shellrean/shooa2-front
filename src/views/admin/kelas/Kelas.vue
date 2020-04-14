<template>
	<div class="card shadow">
		<div class="card-header">
			<router-link :to="{ name: 'kelas.create' }" class="btn btn-info btn-sm">
				<i class="cil-plus"></i> Tambah kelas
			</router-link>
		</div>
		<div class="card-body">
			<b-table
		      id="table-transition-example"
		      :items="kelases.data"
		      :fields="fields"
		      striped
		      small
		      primary-key="name"
		      :tbody-transition-props="transProps"
		    >
		    	<template v-slot:cell(show_details)="row">
                    <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'">
                    	<i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" />
                    </b-button>
                </template>
                <template v-slot:row-details="row">
                	<div class="card">
                		<div class="card-header">
                			{{ row.item._major.name }}
                		</div>
                		<div class="card-body">
                			<table class="table table-sm">
                				<tr v-for="(subject, index) in row.item._subjects">
                					<td v-text="index+1"></td>
                					<td v-text="subject.name"></td>
                				</tr>
                			</table>
                		</div>
                	</div>
                </template>
		    	<template v-slot:cell(actions)="row">
                    <b-dropdown text="Aksi" size="sm" variant="info">
					    <li>
						    <router-link :to="{ name: 'kelas.edit', params: { id: row.item._id } }" class="dropdown-item">
	                            <i class="cil-pencil"></i> Edit
	                        </router-link>
					    </li>
					    <b-dropdown-item @click="deleteKelas(row.item._id)"><i class="cil-trash"></i> Hapus</b-dropdown-item>
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
		name: 'KelasData',
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
		          { key: 'show_details', label: 'Detail' },
		          { key: 'grade', label: 'Grade', sortable: true },
		          { key: 'name', label: 'Nama', sortable: true },
		          { key: 'actions', label: 'Aski' }
		        ]
			}
		},
		computed: {
			...mapState('kelas', {
				kelases : state => state.kelases
			})
		},
		methods: {
			...mapActions('kelas', ['getAllKelas', 'removeKelas']),
			deleteKelas(id) {
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
	                    this.removeKelas(id)
	                    .then(() => {
	                        this.getAllKelas();
	                    })
	                    .catch((err) => {
	                        
	                    })
	                }
	            })
			}
		},
		created() {
			this.getAllKelas()
		}
	}
</script>
<style type="text/css">
	table#table-transition-example .flip-list-move {
	  transition: transform 1s;
	}
</style>