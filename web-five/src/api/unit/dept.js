�}�"  �  A�^����!���� Q0����~�p��A~���(�s6+��V&2� �6��L[}�_|�b/��%#�qI�AdQ1��T������7y�7��$ҏ�Fo��bn�f=���(l��&֚D��B4
��5i!�q�FG}Έ��ނ�N��h���o(D��-�~A�'�a�B�yr�7��>O�Ȑ�O�(�º�m���Bct^J������N}�科���iW޶8,�}�y�7����ђE���f�6��$�}ݎT ����v���?���0^��ۗ��(���=n�ǀ�糒g�aeT)�~-�ΟF�� N���z��%��6�/�|Aw�h�S�R?F�zw5�����"��]ܦz��k�l��={73���?Q�i_w�&jΈ+�i��{+�i;b�䚈{��
������|��{�G"��?�(�@�Y^�Y�#��c�g"�����:��ʴi=p��pZņt�ʾ��@&2A�,����hm9�z��7ɱNݢ='/unit/dept/' + id,
      method: 'get'
    })
  }
  
  export function delObj (id) {
    return request({
      url: '/unit/dept/' + id,
      method: 'delete'
    })
  }
  
  export function putObj (obj) {
    return request({
      url: '/unit/dept/',
      method: 'put',
      data: obj
    })
  }