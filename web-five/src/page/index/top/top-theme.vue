�}�"  �  �10�Nl1w���� QІ5���b�ؤ^�P@����F[��w$�'�����l���A�߯id���",��y`��,����AQJ���)�`����*��G��5�].v ��U���5���[V�C��� $�h�h�T�`I)�PB��F��
����I�h���f�,l�S��ɚwH�Ɍ�\�L���:Qa��p�"�!��1I�ߙ�ʊ�����#�����\��y�ß��ls��,ĕMK���O��';��dۗ��(���=n�ǀ�糒g�aeT)�~-�ΟF�� N���z��%��6�/�|Aw�h�S�R?F�zw5�����"��]ܦz��k�l��={73���?Q�i_w�&jΈ+�i��{+�i;b�䚈{��
������|��{�G"��?�(�@�Y^�Y�#��c�g"�����:��ʴi=p��pZņt�ʾ��@&2A�,����hm9�z��7ɱNݢ=lD.	"A0pQclq�<��e%%�q���/�=)�b�aU�9����MƳ�hw�h�ҕx�� Z�A�ࠃ$��P�,2Di��˄^�WԦ�O��t�m��5����\V�j���[���g�<ׁ:^�Ƈ|`�0�h��қ�����M+eZ#d�l���y��o��S�Z�����A�����A�@��l�d%�C�$d�����.�I�
�79��O/yo�\#U�i^��N,D�|�\��q� 	��+�l�-r)�.���o�����LW�y/(܎���&��#���>�ˀ���+=�i��IB:����΅8�0���_yMџk�� pzF<�Q���,��!��
�
ԅ��\�k�&��1S⫇�R���&\��9��h��<�
��L��?� \�o�h�l��ik�e��e��#'a�qŇeo`�v��:�-�K}D9���4HUo�EJ��'�SYGs6����g	���M�z ʺ��_q�I��K        name: '渐变主题',
          value: 'theme-gradual'
        }
      ]
    }
  },
  watch: {
    text: function (val) {
      this.$store.commit('SET_THEME_NAME', val);
      setTheme(val);
    }
  },
  computed: {
    ...mapGetters(["themeName"])
  },
  mounted () {
    this.text = this.themeName;
    if (!this.text) {
      this.text = '';
    }
  },
  methods: {
    open () {
      this.box = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
}
</style>

