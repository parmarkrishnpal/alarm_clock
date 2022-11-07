#include <iostream>
using namespace std;

class Solution {
public:
   void shiftedArray(int arr[], int n, int pos, int direction){
      int shiftedArr[n];
      
      if(direction){
         for(int i = 0; i < n; i++){
            shiftedArr[i] = arr[(i+pos)%n];
         }
      }else{
         for(int i = 0; i < n; i++){
            shiftedArr[i] = arr[(n-pos+i)%n];
         }
      }
      
      for(int i = 0; i < n; i++){
         cout << shiftedArr[i] << " ";
      }
      return;
   }
};


int main()
{
   int n;
   cin>>n;
   int arr[n];
   for(int i = 0; i < n; i++){
      cin >> arr[i];
   }
   int p, d;
   cin>>p>>d;
   
   Solution sol;
   sol.shiftedArray(arr, n, p, d);
   
   return 0;
}
