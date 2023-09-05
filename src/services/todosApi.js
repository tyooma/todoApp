import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';

export const todosApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getTodos: builder.query({
      queryFn: async () => {
        try {
          let todos = [];
          const dataRef = firestore().collection('todos');
          const snapshot = await dataRef.get();
          snapshot.docs.map(doc => {
            const { title, complete } = doc.data();
            todos.push({
              id: doc.id,
              title,
              complete,
            });
          });
          return { data: todos };
        } catch (error) {
          console.log('Error', error);
        }
      },
    }),
    addTodo: builder.mutation({
      queryFn: async payload => {
        const ref = firestore().collection('todos');
        try {
          await ref.add({
            title: payload.title,
            complete: false,
          });

          return;
        } catch (error) {
          console.log('Error', error);
        }
      },
    }),
    checkTodo: builder.mutation({
      queryFn: async payload => {
        try {
          await firestore().collection('todos').doc(payload.id).update({
            complete: !payload.complete,
          });

          return;
        } catch (error) {
          console.log('Error', error);
        }
      },
    }),
    deleteTodo: builder.mutation({
      queryFn: async payload => {
        try {
          await firestore().collection('todos').doc(payload.id).delete();

          return;
        } catch (error) {
          console.log('Error', error);
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useCheckTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
