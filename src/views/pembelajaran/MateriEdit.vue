<template>
	<div>
		<div class="card card-bg shadow">
			<div class="card-header">
				<router-link :to="{ name: 'pembelajaran', params: { id: $route.params.id } }" class="btn btn-light btn-sm">
					<i class="cil-action-undo"></i> Kembali
				</router-link> 
			</div>
			<div class="card-body">
				<div class="form-group">
					<label>Mata pelajaran</label>
					<multiselect 
					v-model="data._subject"
					placeholder="Mata pelajaran" 
					label="name" track-by="_id" 
					:options="kelas._subjects"
					></multiselect>
				</div>
				<div class="form-group">
					<label>Judul</label>
					<input type="text" class="form-control" name="" placeholder="Tulis judul..." v-model="data.title">
				</div>
				<div class="form-group">
					<label>Deskripsi</label>
					<textarea class="form-control" placeholder="Tulis sedikit deskipsi tentang materi ini..." v-model="data.description"></textarea>
				</div>
				<div class="form-group">
					<label>Materi</label>
                    <div class="editor">
		                <editor-menu-bar :editor="content" v-slot="{ commands, isActive }">
		                  <div class="menubar">
		                    <button
		                      class="menubar__button"
		                      @click="showImagePrompt(commands.image)"
		                    >
		                      <i class="cil-satelite"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.bold() }"
		                      @click="commands.bold"
		                    >
		                     <i class="cil-bold"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.italic() }"
		                      @click="commands.italic"
		                    >
		                     <i class="cil-italic"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.strike() }"
		                      @click="commands.strike"
		                    >
		                     <i class="cil-strikethrough"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.underline() }"
		                      @click="commands.underline"
		                    >
		                     <i class="cil-underline"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.paragraph() }"
		                      @click="commands.paragraph"
		                    >
		                     <i class="cil-paragraph"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.heading({ level: 1 }) }"
		                      @click="commands.heading({ level: 1 })"
		                    >
		                      <small>H1</small>
		                    </button>

		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.heading({ level: 2 }) }"
		                      @click="commands.heading({ level: 2 })"
		                    >
		                      <small>H2</small>
		                    </button>

		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.heading({ level: 3 }) }"
		                      @click="commands.heading({ level: 3 })"
		                    >
		                      <small>H3</small>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.bullet_list() }"
		                      @click="commands.bullet_list"
		                    >
		                     <i class="cil-list"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.ordered_list() }"
		                      @click="commands.ordered_list"
		                    >
		                     <i class="cil-list-numbered"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      :class="{ 'is-active': isActive.blockquote() }"
		                      @click="commands.blockquote"
		                    >
		                     <i class="cil-double-quote-sans-left"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      @click="commands.undo"
		                    >
		                     <i class="cil-action-undo"></i>
		                    </button>

		                    <button
		                      class="menubar__button"
		                      @click="commands.redo"
		                    >
		                     <i class="cil-action-redo"></i>
		                    </button>
		                    <button
		                      class="menubar__button"
		                      @click="commands.redo"
		                    >
		                     <i class="cil-paperclip"></i>
		                    </button>
		                  </div>
		                </editor-menu-bar>
		                <editor-content class="editor__content" :editor="content" />
		              </div>
				</div>
				<div class="form-group">
					<button class="btn btn-sm btn-info" @click="submit" :disabled="isLoading"><i class="cil-save"></i> {{ isLoading ? 'Loading...' : 'Simpan & bagikan' }}</button>
				</div>
			</div>
		</div>
		<b-modal id="modal-scoped" size="xl">
	        <template v-slot:modal-header="{ close }">
	          <h5>Pilih gambar</h5>
	        </template>
	        <template v-slot:modal-footer="{cancel}">
	          <b-button size="sm" variant="info" @click="cancel()">
	            Tutup
	          </b-button>
	        </template>
	    </b-modal>
	</div>
</template>
<script>
import Vue from 'vue'
import { ModalPlugin, BButton } from 'bootstrap-vue'
Vue.use(ModalPlugin)
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { Editor, EditorContent, EditorFloatingMenu,EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
  Image,
} from 'tiptap-extensions'

export default {
	name: 'MateriCreate',
	components: {
	    EditorContent,
	    EditorFloatingMenu,
	    EditorMenuBar,
	    BButton,
	    Multiselect
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('kelas', {
			kelas : state => state.kelas
		})
	},
	data() {
	    return {
	      content : new Editor({
	        extensions: [
	          new Blockquote(),
	          new Image(),
	          new BulletList(),
	          new CodeBlock(),
	          new HardBreak(),
	          new Heading({ levels: [1, 2, 3] }),
	          new ListItem(),
	          new OrderedList(),
	          new TodoItem(),
	          new TodoList(),
	          new Link(),
	          new Bold(),
	          new Code(),
	          new Table(),
	          new TableHeader(),
	          new TableCell(),
	          new TableRow(),
	          new Italic(),
	          new Strike(),
	          new Underline(),
	          new History(),
	          new Placeholder({
	            emptyNodeClass: 'is-empty',
	            emptyNodeText: 'Tulis pertanyaan …',
	            showOnlyWhenEditable: true,
	          })
	        ],
	        content: ''
	      }),
	      data: {
	      	title: '',
	      	description: '',
	      	_subject: ''
	      }
	  }
	},
	methods: {
		...mapActions('materi',['postMatter']),
		showImagePrompt(command) {
	      this.$bvModal.show('modal-scoped')
	      this.command = command
	    },
	    submit() {
	    	this.postMatter({ 
	    		_classroom: this.$route.params.id,
	    		title: this.data.title,
	    		description: this.data.description,
	    		content: this.content.getHTML(),
	    		_subject: this.data._subject
	    	})
	    	.then(() => {
	    		this.router.replace({ name: 'pembelajaran', params: { id: this.$route.params.id }})
	    	})
	    	.catch(() => {
	    		
	    	})
	    }
	}
}
</script>
<style lang="scss">
.menubar {

  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(#000000, 0.05);
    }

    &.is-active {
      background-color: rgba(#000000, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
table {

}
td {
  border: 1px solid #000;
}
.ProseMirror {
    border: 1px solid #676767;
  }
</style>