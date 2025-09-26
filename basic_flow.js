graph TD
    %% Define Shapes: Rect for Process, Diamond for Decision, Rounded Rect for Start/End, Parallelogram for Data/IO

    Start(("Start"))
    
    %% Data Preparation Phase
    Start --> A[/"Acquire Datasets
    (CIC-IDS17/18, DoS17, DDoS19)"/]
    A --> B["Preprocess Data
    (Clean, Scale, Standardize)"]
    B --> C[/"Split Data
    (Train & Test Sets)"/]
    
    %% Parallel Model Training
    C --> TrainXGB["Train XGBoost Model"]
    C --> TrainMLP["Train MLP Model"]
    
    %% Parallel Model Evaluation
    TrainXGB --> EvalXGB["Evaluate XGBoost Performance"]
    TrainMLP --> EvalMLP["Evaluate MLP Performance"]
    
    %% Convergence & Decision Point
    EvalXGB --> D
    EvalMLP --> D{"Are models high-performing
    and comparable?"}
    
    D -- Yes --> E["Filter Test Data for
    Correctly Co-Classified Attacks"]
    D -- No --> Stop(("End"))
    
    %% Parallel Explanation Generation
    E --> GenShapXGB["Generate SHAP Explanations
    for XGBoost"]
    E --> GenShapMLP["Generate SHAP Explanations
    for MLP"]
    
    %% Convergence for Consistency Calculation
    GenShapXGB --> F
    GenShapMLP --> F["Calculate Top-N Feature Agreement
    (Jaccard Index)"]
    
    %% Analysis and Output
    F --> G[/"Output: Consistency Score
    per Instance"/]
    G --> H["Aggregate All Scores"]
    H --> I["Analyze Score Distribution
    (Overall & By Attack Type)"]
    I --> J[/"Publish Findings & Conclusion"/]
    
    J --> End(("End"))
