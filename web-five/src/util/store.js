�}�"  �  ���K{�U���Q0�Q���~�|L6�v��_�ԇ/ڴsj7����Ę��
#��e� s���@͂�o�բ1e���d����{��8�W"N������*+{O�]��a�8Ԫ�����@;`�]T��)���GS1�]J� �=p|2�D��j�bLX)sX��2;�f}iSIr��E�N������jBɴ�CRvεӃ#q���D�8�N�O+�������ѕ*{��;X�[�j�k�]��Mw��x�Q1�{�:s��ד��9,l@���R��o?raeT)�~-�ΟF�� N���z��%��6�/�|Aw�h�S�R?F�zw5�����"��]ܦz��k�l��={73���?Q�i_w�&jΈ+�i��{+�i;b�䚈{��
������|��{�G"��?�(�@�Y^�Y�#��c�g"�����:��ʴi=p��pZņt�ʾ��@&2A�,����hm9�z��7ɱNݢ=l�#-��ݝ���dj�F����Y[&U���b0=�[�,�^`�����h�K�tI�㻀��J	{l�a�z�=������fZ��Y��� /1%݃��"r%�;�Q/F��?�M[��}/y�LqM����	1�������EwJ��ȅ����u%.�ÁVuY
U�j�h���CPϚ�n���L�!Gx���.vw�4C���L	`G	'�P6Xws'� ͺe'Eo�g��xpԮZ�y�!��r�&�"��o(�~".�ȵ�:6�r�}�u��f�{��5��U��k)��1v�';��G�"�?�3�$a�út���v'b�R	0ZȌv�.r� ?�
�$W�x��enRZ���d(B�ɳ���=��It��Z�.Ȫ,9�$�>��̢Z�����1)y8MS��B2����vh5z<fJB�$wLWo�(�{�\�Y��-#�����^��� �%��V���{Ob��Y�.�R�'�_������J*�>�+N/�n�h�>����;���s��%��I,l�)��Z\�2��U����"��M��r���@���	�`q�"*2��H�r0�m�ln_]̈������wm[_��!��mr��1��.�/��~	԰���G=����w�����'X�`�Y˫G��$��T:.:�_#Y=A j�r�������ە�d��L��?����A����P���F����A�x�B�a�ʆ� a���p6���¯�*T`���] w��=ٴNB��t0ol^�7��8*�N�5R�4=���#�##>�='��Ⱊ]��\٧_�@3��~؁�o=�AzI�Cg�Mx�Vs(&�ۉ��K�%�i�2Po9�� ����pK�/N¦����o4Z6e9��䒻�Z;{�B�bך2���?a6���m�����*�F[e�}��'�F�v$��b*�� ����ܭ5�Hk��YB�D�ɓ�|�H�s0��qע��o|��4�ً�E�{GE[�FA폔TDxD�Y�g��Qk����pn;d�]XI~4� '�al]/<E$��&�#��#�1J9ɔ�{\�8q"m��5��'����:�c��x�%ڻ_@�5Yȓ�A+N����Ȕ���c��jL��Ē�yu���b ��y<F�D�ۡ�!F����Դ���=���g`Z�fe�º7���������G2Y5c/��K��� ��ؘچ�5�6�a���?�ڔsZ���-~�(�5��ޭ��0５h�+�?��a>�Z�dJЋSÆ� �%�nX~��Ϣ+�)?tc���+��-�Y��p/A�?�+�MQ�$���n�?���]�q�/��6T��/"�{�k��I2~>����\77Ԑ��)���ʷ]�'�n^�����	�#�ۂW:��3�G��������|�E*��xocD������i_�8�Nw��8O�Ms�(7�K��w��N����̢F��"%�q��!�lr�q?��<��&O��z�j,h?ښ����ϣ�#�+ֽ{�X4������9�ful[+S���'!�3���sw-        }))
        }
    }

    return list;

}

/**
 * 清空全部localStorage
 */
export const clearStore = (params) => {
    let {
        type
    } = params;
    if (type) {
        window.sessionStorage.clear();
        return
    }
    window.localStorage.clear()
}