�}"  �  0���2������� Q��B I�?$��ڥr8�ӌ�͘����<?�k���P�^�����b�fy6+*S���A�m</�ڳo�LrA�ԮԞ±7�Js��.����6v�,gԫD�r~Zm��=}�L�]��ٙ@�H$��̎�6�1/����?oߤ+p�:�b�7�j�:W�Ҋ�h���C^2TqnMn��!����	�lِ6������a_��ϴ�yΧw6���[ޛ�Rؐ[`���+�=�</Xmk0^��ۗ��(���=n�ǀ�糒g�aeT)�~-�ΟF�� N���z��%��6�/�|Aw�h�S�R?F�zw5�����"��]ܦz��k�l��={73���?Q�i_w�&jΈ+�i��{+�i;b�䚈{��
������|��{�G"��?�(�@�Y^�Y�#��c�g"�����:��ʴi=p��pZņt�ʾ��@&2A�,����hm9�z��7ɱNݢ=l�)��b\��j.C��.([E})�n��ᮟ�l�#�,c��o�{�i��X�ǒ����]���\.��j��W��AQ^8�R��~�.l(#Yn���RSC �����#i^���og�r�¢kO�'ַ1A����q��ݎBK����^�`rT���ML��I�?���1�������`�����R7�L�.�ʋ_`�\����^��ơoh�ޡ	v�u��L��_&5z�h��vYO�[�p\�qp�)��w�E$����4<�!ȿ�W��]�o�m���"�Tvl'�S>3�5�
=�VyUm~N���י�y0�h��#u`�L�e�ಝmD�@|���
͐}/t(�����Z@�h�bך~N��$�0��3��m�� �DnD�z��<��(Z��!e����㰈�|�Uk��Y��LՓYQV��b�R�SQjZw9�`E<���逓�;���kD�Tx5.��a��v�~�m������� $ߊ<���\��M      //秒   
      "q+" : Math.floor((this.getMonth()+3)/3), //季度   
      "S"  : this.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt)) 
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o) 
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
  }
}