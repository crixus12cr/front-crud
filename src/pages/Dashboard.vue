<template>
  <div>
    <modal :show.sync="modal">
      <card type="secondary">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">Agregar</h5>
        </template>
        <div>
          <base-input label="Nombre" type="text" placeholder="Ingresa el nombre de la cancion" v-model="nCancion">
          </base-input>
          <base-input label="Categoria" v-model="categoria">
            <select class="form-control" id="exampleFormControlSelect1" v-model="categoria">
              <option v-for="(option, index) in options" :key="index" :value="option.id">
                <p>{{ option?.nombre }}</p>
              </option>
            </select>
          </base-input>
        </div>
        <template slot="footer">
          <base-button type="secondary" @click="modal = false">Cerrar</base-button>
          <base-button type="primary" @click="add">Guardar</base-button>
        </template>
      </card>
    </modal>
    <modal :show.sync="modalEdit">
      <card type="secondary">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
        </template>
        <div>
          <base-input label="Nombre" type="text" placeholder="Ingresa el nombre de la cancion" v-model="datosEdit.nombre">
          </base-input>
          <base-input label="Categoria" v-model="datosEdit.categoria_id">
            <select class="form-control" id="exampleFormControlSelect1" v-model="datosEdit.categoria_id">
              <option v-for="(option, index) in options" :key="index" :value="option.id">
                <p>{{ option?.nombre }}</p>
              </option>
            </select>
          </base-input>
          <input type="checkbox" v-model="datosEdit.estado"> Estado
        </div>
        <template slot="footer">
          <base-button type="secondary" @click="modalEdit = false">Cerrar</base-button>
          <base-button type="primary" @click="editEnd">Guardar</base-button>
        </template>
      </card>
    </modal>
    <div class="row">
      <div class="col-lg-12 col-md-10">
        <card class="card">
          <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
              <h1 class="nav-link">Canciones</h1>
            </li>
            <li class="nav-item addBtn">
              <base-button type="primary" @click="modal = true">
                Agregar
              </base-button>
            </li>
          </ul>
          <div class="table-responsive">
            <div class="container">
              <div class="row" v-for="(song, index) in songs" :key="index">
                <div class="col">
                  <img src="http://placekitten.com/100/100" class="rounded float-start" alt="...">
                  <hr />
                </div>
                <div class="col">
                  <p class="text-center">
                    {{ song.nombre }}
                  </p>
                </div>
                <div class="col">
                  <p class="text-center">
                    {{ song.categoria.nombre }}
                  </p>
                </div>
                <div class="col">
                  <p class="text-center">
                    {{ song.estado == 1 ? 'Activo' : 'Inactivo' }}
                  </p>
                </div>
                <div class="col">
                  <img src="https://img.icons8.com/nolan/34/edit--v1.png" @click="editar(song)" style="cursor: pointer" />
                  <img src="https://img.icons8.com/nolan/34/delete-sign.png" @click="borrar(song)"
                    style="cursor: pointer" />
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import modal from '@/components/Modal.vue'
import axios from 'axios'
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from './Dashboard/TaskList';
import UserTable from './Dashboard/UserTable';
import config from '@/config';

const headers = {
  'Authorization': `*`
}
export default {
  components: {
    modal,
    LineChart,
    BarChart,
    TaskList,
    UserTable
  },
  data() {
    return {
      songs: [],
      modal: false,
      modalEdit: false,
      categoria: null,
      options: [],
      nCancion: null,
      datosEdit: { nombre: '', categoria_id: 0, estado: 0 }
    }
  },
  created() {
    this.consulta()
    axios.get(`${process.env.VUE_APP_BASE_URL}/categorias`, null, {
      headers: headers
    }).then(resp => {
      this.options = resp.data
    }).catch(error => {
      reject(error)
    })
  },
  methods: {
    consulta() {
      axios.get(`${process.env.VUE_APP_BASE_URL}/canciones`, null, {
        headers: headers
      }).then(resp => {
        this.songs = resp.data
      }).catch(error => {
        reject(error)
      })
    },
    editEnd() {
      axios.put(`${process.env.VUE_APP_BASE_URL}/canciones/${this.datosEdit.id}`, { nombre: this.datosEdit.nombre, categoria_id: this.datosEdit.categoria_id, estado: this.datosEdit.estado }, {
        headers: headers
      }).then(resp => {
        alert(resp.data.message);
        this.modalEdit = false
        this.consulta()
      }).catch(error => {
        reject(error)
      })
    },
    editar(item) {
      this.datosEdit = item
      this.modalEdit = true
    },
    add() {
      axios.post(`${process.env.VUE_APP_BASE_URL}/canciones`, { nombre: this.nCancion, categoria_id: this.categoria }, {
        headers: headers
      }).then(resp => {
        alert(resp.data.message);
        this.modal = false
        this.consulta()
      }).catch(error => {
        reject(error)
      })
    },
    borrar(item) {
      axios.delete(`${process.env.VUE_APP_BASE_URL}/canciones/${item.id}`, null, {
        headers: headers
      }).then(resp => {
        alert(resp.data.message);
        this.consulta()
      }).catch(error => {
        reject(error)
      })
    },
  },
};
</script>
<style>
.addBtn {
  padding-left: 90%;
}
</style>
