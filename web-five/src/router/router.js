�}�"  �  �q�D��]����� QȘ+f��b)�O�^��?��+=Ƭ�=�BJ���t�)G�;�h%�J�}��P�m�%��$Y]�㶆��5�5(�,�gb��0�S,?0WX�/�Gߚ�y<F���11,��{��LB7�%6�����u�w�#+��ܮ��	:���5�)F�sM�.��~�=�R;�{�����DZ�E��k��V�i���F�&<Z��yr�f<���@il�n�&sm�f�6��$�}ݎT ����v���?���0^��ۗ��(���=n�ǀ�糒g�aeT)�~-�ΟF�� N���z��%��6�/�|Aw�h�S�R?F�zw5�����"��]ܦz��k�l��={73���?Q�i_w�&jΈ+�i��{+�i;b�䚈{��
������|��{�G"��?�(�@�Y^�Y�#��c�g"�����:��ʴi=p��pZņt�ʾ��@&2A�,����hm9�z��7ɱNݢ=o.meta.savedPosition || 0
            }
        }
    },
    routes: []
});
AvueRouter.install(Router, Store);
Router.addRoutes(Router.$avueRouter.formatRoutes(Store.state.user.menu, true));
Router.addRoutes([].concat(PageRouter, ViewsRouter));
export default Router;